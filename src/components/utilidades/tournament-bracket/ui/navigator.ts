import type { TournamentManager } from "../logic/manager";

export class TournamentNavigator {
    static findNextPlayableMatch(manager: TournamentManager) {
        for (const round of manager.rounds) {
            // Find first match with NO winner but WITH players defined
            const m = round.matches.find(m => !m.winner && m.player1 && m.player2);
            if (m) return m;
        }
        return null;
    }

    static isTournamentUnfinished(manager: TournamentManager): boolean {
        return manager.rounds.some(r => r.matches.some(m => !m.winner));
    }

    static async scrollToMatch(
        matchId: string,
        manager: TournamentManager,
        currentActiveRound: number,
        callbacks: {
            onMobileRoundChange: (index: number) => void,
            onShowToast: () => void
        }
    ) {
        const desktopContainer = document.querySelector('.desktop-bracket-container') as HTMLElement;
        // Check if desktop view is active (visible)
        const isDesktop = desktopContainer && desktopContainer.offsetParent !== null;

        if (isDesktop) {
            this.handleDesktopScroll(desktopContainer, matchId);
        } else {
            this.handleMobileScroll(matchId, manager, currentActiveRound, callbacks.onMobileRoundChange);
        }
    }

    private static handleDesktopScroll(container: HTMLElement, matchId: string) {
        const targetBtn = container.querySelector(`button[data-match-id="${matchId}"]`) as HTMLElement;

        if (targetBtn) {
            const matchCard = targetBtn.closest('.group') as HTMLElement || targetBtn;

            const targetRect = matchCard.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const targetCenterX = targetRect.left + (targetRect.width / 2);
            const targetCenterY = targetRect.top + (targetRect.height / 2);

            const containerCenterX = containerRect.left + (containerRect.width / 2);
            const containerCenterY = containerRect.top + (containerRect.height / 2);

            const deltaX = targetCenterX - containerCenterX;
            const deltaY = targetCenterY - containerCenterY;

            container.scrollTo({
                left: container.scrollLeft + deltaX,
                top: container.scrollTop + deltaY,
                behavior: 'smooth'
            });

            this.highlightElement(matchCard);
        } else {
            console.warn("[TournamentNavigator] Target button not found in desktop container");
        }
    }

    private static handleMobileScroll(
        matchId: string,
        manager: TournamentManager,
        currentActiveRound: number,
        onRoundChange: (i: number) => void
    ) {
        // Find which round this match belongs to
        const roundIndex = manager.rounds.findIndex(r => r.matches.some(m => m.id === matchId));

        if (roundIndex !== -1 && roundIndex !== currentActiveRound) {
            // Need to switch tabs first
            onRoundChange(roundIndex);

            // Wait for DOM update then scroll (recursive call via timeout handled by caller usually, but here we can try to find it after delay)
            // Since we don't have the caller's context easily to re-call 'scrollToMatch', we rely on the implementation 
            // of onRoundChange to eventually allow scrolling, OR we wait here.
            // Ideally, the controller re-calls this logic or we set a timeout here.
            setTimeout(() => {
                const mobileContainer = document.querySelector('.bracket-mobile') as HTMLElement;
                const targetBtn = mobileContainer?.querySelector(`button[data-match-id="${matchId}"]`) as HTMLElement;
                if (targetBtn) {
                    this.scrollMobileElementIntoView(targetBtn);
                }
            }, 100);
            return;
        }

        const mobileContainer = document.querySelector('.bracket-mobile') as HTMLElement;
        const targetBtn = mobileContainer?.querySelector(`button[data-match-id="${matchId}"]`) as HTMLElement;

        if (targetBtn) {
            this.scrollMobileElementIntoView(targetBtn);
        } else {
            console.warn("[TournamentNavigator] Target button not found in mobile container");
        }
    }

    private static scrollMobileElementIntoView(targetBtn: HTMLElement) {
        const matchCard = targetBtn.closest('.bg-white') as HTMLElement || targetBtn;
        matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.highlightElement(matchCard);
    }

    private static highlightElement(el: HTMLElement) {
        el.classList.add('ring-4', 'ring-indigo-400', 'ring-opacity-50');
        setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-400', 'ring-opacity-50'), 2000);
    }
}
