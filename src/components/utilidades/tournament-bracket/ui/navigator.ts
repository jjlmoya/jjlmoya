import type { TournamentManager } from "../logic/manager";

export class TournamentNavigator {
    static findNextPlayableMatch(manager: TournamentManager) {
        for (const round of manager.rounds) {
            const m = round.matches.find((m) => !m.winner && m.player1 && m.player2);
            if (m) return m;
        }
        return null;
    }

    static isTournamentUnfinished(manager: TournamentManager): boolean {
        return manager.rounds.some((r) => r.matches.some((m) => !m.winner));
    }

    static async scrollToMatch(
        matchId: string,
        manager: TournamentManager,
        currentActiveRound: number,
        callbacks: {
            onMobileRoundChange: (index: number) => void;
            onShowToast: () => void;
        }
    ) {
        const desktopContainer = document.querySelector(
            ".desktop-bracket-container"
        ) as HTMLElement;

        const isDesktop = desktopContainer && desktopContainer.offsetParent !== null;

        if (isDesktop) {
            this.handleDesktopScroll(desktopContainer, matchId);
        } else {
            this.handleMobileScroll(
                matchId,
                manager,
                currentActiveRound,
                callbacks.onMobileRoundChange
            );
        }
    }

    private static handleDesktopScroll(container: HTMLElement, matchId: string) {
        const targetBtn = container.querySelector(
            `button[data-match-id="${matchId}"]`
        ) as HTMLElement;

        if (targetBtn) {
            const matchCard =
                (targetBtn.closest('div[style*="position: absolute"]') as HTMLElement) || targetBtn;

            if (matchCard && matchCard.style.position === "absolute") {
                const targetTop = parseInt(matchCard.style.top || "0");
                const targetLeft = parseInt(matchCard.parentElement?.style.left || "0");

                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const cardWidth = matchCard.offsetWidth;
                const cardHeight = matchCard.offsetHeight;

                const scrollLeft = targetLeft - containerWidth / 2 + cardWidth / 2;
                const scrollTop = targetTop - containerHeight / 2 + cardHeight / 2;

                container.scrollTo({
                    left: Math.max(0, scrollLeft),
                    top: Math.max(0, scrollTop),
                    behavior: "smooth",
                });

                this.highlightElement(matchCard);
            } else {
                const targetRect = matchCard.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;

                const containerCenterX = containerRect.left + containerRect.width / 2;
                const containerCenterY = containerRect.top + containerRect.height / 2;

                const deltaX = targetCenterX - containerCenterX;
                const deltaY = targetCenterY - containerCenterY;

                container.scrollTo({
                    left: container.scrollLeft + deltaX,
                    top: container.scrollTop + deltaY,
                    behavior: "smooth",
                });

                this.highlightElement(matchCard);
            }
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
        const roundIndex = manager.rounds.findIndex((r) => r.matches.some((m) => m.id === matchId));

        if (roundIndex !== -1 && roundIndex !== currentActiveRound) {
            onRoundChange(roundIndex);

            setTimeout(() => {
                const mobileContainer = document.querySelector(".bracket-mobile") as HTMLElement;
                const targetBtn = mobileContainer?.querySelector(
                    `button[data-match-id="${matchId}"]`
                ) as HTMLElement;
                if (targetBtn) {
                    this.scrollMobileElementIntoView(targetBtn);
                }
            }, 100);
            return;
        }

        const mobileContainer = document.querySelector(".bracket-mobile") as HTMLElement;
        const targetBtn = mobileContainer?.querySelector(
            `button[data-match-id="${matchId}"]`
        ) as HTMLElement;

        if (targetBtn) {
            this.scrollMobileElementIntoView(targetBtn);
        } else {
            console.warn("[TournamentNavigator] Target button not found in mobile container");
        }
    }

    private static scrollMobileElementIntoView(targetBtn: HTMLElement) {
        const matchCard = (targetBtn.closest(".bg-white") as HTMLElement) || targetBtn;
        matchCard.scrollIntoView({ behavior: "smooth", block: "center" });
        this.highlightElement(matchCard);
    }

    private static highlightElement(el: HTMLElement) {
        el.classList.add("ring-4", "ring-indigo-400", "ring-opacity-50");
        setTimeout(() => el.classList.remove("ring-4", "ring-indigo-400", "ring-opacity-50"), 2000);
    }
}
