# DEATH's Library (Biblioteca de la Muerte)

**⚠️ Disclaimer / Note to Developers**

The code within this directory is highly improvable. Due to numerous changes in concepts and ideas throughout the development process, the current implementation is not resolved in the most elegant or optimized manner.

It is strongly recommended **not** to use this code as a reference for best practices or as a structural example. It works, but it reflects a chaotic creative process rather than clean engineering.

## Code Analysis & Technical Debt

The following points highlight why this module is considered "messy" and how it could be optimized:

### 1. Monolithic Architecture (`LifeBook.astro`)
*   **The Problem:** The `LifeBook` component acts as a "God Object". It explicitly imports and renders every single page component (`PageHeart`, `PageSun`, etc.).
*   **Consequence:** Adding, removing, or reordering pages requires editing the file in multiple locations (imports, visual container, text container, logic).
*   **Optimization:** Use a configuration array (e.g., `const PAGES = [{ component: PageHeart, id: 'heart' }, ...]`) and map over it to render the pages dynamically.

### 2. Heavy DOM Manipulation
*   **The Problem:** The components rely heavily on vanilla JavaScript (`document.querySelector`, `classList.toggle`, `innerHTML`) to handle state changes (page turning, animations, content updates).
*   **Consequence:** This leads to "spaghetti code" that is hard to debug and test. The UI state is scattered across the DOM rather than being in a central state object.

### 3. Event-Based Data Flow
*   **The Problem:** Data (birthdate, life stats) is passed to children via custom window events (`update-life-stats`).
*   **Consequence:** This makes the data flow implicit and fragile. It's difficult to track where data comes from and who is consuming it.

### 4. Repetitive Code
*   **The Problem:** The individual page components (`PageSun.astro`, `PageMoon.astro`, etc.) share 90% of their structure (left/right split, conditional rendering).
*   **Consequence:** If we want to change the layout of a page, we have to edit 18 separate files.
*   **Optimization:** Create a generic `<BookPageLayout>` component that accepts `visual` and `text` slots. The individual files should only contain the unique content.

### 5. Hardcoded Logic
*   **The Problem:** Logic for "sharing/tearing" pages contains hardcoded strings and indices inside the main script.
*   **Consequence:** The content is coupled with the display logic.
*   **Optimization:** Move text content and specific page behaviors into a separate data/content file or colocate them with the page components themselves.
