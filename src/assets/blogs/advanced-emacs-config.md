# Setting Up an Advanced Emacs Configuration for Productivity

By Zaine Qayyum

---

I recently spoke about what Emacs is, and how it is useful for productivity. I wanted to write this up again and dive more into the other files that were stored in the `/scripts` directory , as well as how to set it up.

## Prerequisites

Before we begin, ensure you have Emacs installed. You can install Emacs using the following commands based on your operating system:

- **Ubuntu/Debian:** `sudo apt install emacs`
- **MacOS (Homebrew):** `brew install emacs`
- **Windows:** Use [MSYS2](https://www.msys2.org/) or install Emacs from [GNU Emacs](https://www.gnu.org/software/emacs/).

Additionally, ensure that `git` is installed to clone repositories and manage configurations.

## Download the Configuration Files

First let's walk through how to set this up.

Clone the repository or manually download the provided configuration files into your `~/.emacs.d/` directory:

```sh
mkdir -p ~/.emacs.d/
cd ~/.emacs.d/
```

The following file should be copied to `~/.emacs.d/`:
- `init.el`

And the following files should be copied into `~/.emacs.d/scripts`:
- `auto-comp.el`
- `custom-agenda.el`
- `displays.el`
- `keyboard.el`
- `shells.el`
- `window.el`

If you are using `git`, you can clone your repository directly:

```sh
git clone https://github.com/zainezq/dot-files/tree/main/emacs-config
```
## Understanding the Configuration

This configuration is modularised for easier maintenance. Each file handles a specific feature:

### init.el: The Core Configuration

The `init.el` file is the entry point of the configuration. It:
- Loads package management (MELPA, `use-package`)
- Imports additional modules (`displays`, `shells`, `auto-comp`, `window`, `keyboard`, `custom-agenda`)
- Configures UI elements such as themes, icons, and window behavior
- Sets up Org mode and language support
- Enables Evil mode for Vim-like keybindings

### auto-comp.el: Auto-Completion Setup

This file configures `company-mode` for autocompletion in Emacs. It:
- Loads `company-mode` and `company-box` for a better UI
- Sets the minimum prefix length and delay before suggestions appear
- Enables backend support for various modes

### keyboard.el: Custom Keybindings

This file sets up keybindings using the `general.el` package. Some useful shortcuts include:
- `SPC .` → Open file finder
- `SPC f c` → Open `init.el` for quick edits
- `SPC b b` → Switch buffers
- `SPC w 1` → Removes (not kills) all buffers except the current one
- `SPC t n` → Toggle NeoTree file explorer

### window.el: Window Management

Defines functions for moving buffers between splits using `windmove`. Functions include:
- `buf-move-up` → Swap buffers up
- `buf-move-down` → Swap buffers down
- `buf-move-left` → Swap buffers left
- `buf-move-right` → Swap buffers right

### shells.el: Shell and Terminal Integration

Configures:
- `vterm` as the primary terminal
- `eshell-toggle` for quick access to Eshell
- `vterm-toggle` for easy terminal toggling

### custom-agenda.el: Org Mode Enhancements

This file customises Org mode agendas. It:
- Configures custom agenda views
- Hides the Org agenda startup message
- Enables extra features such as displaying scheduled tasks

### displays.el: UI Enhancements

This file improves the visual experience in Emacs:
- Configures `dashboard.el` to show a custom startup screen, you may modify this to your liking, see: [Emacs Dashboard](https://github.com/emacs-dashboard/emacs-dashboard)
- Enables `neotree` for file navigation
- Hides unnecessary UI elements for a cleaner look

## Installing Dependencies

Open Emacs and run the following command to install missing packages:

```sh
M-x package-refresh-contents
M-x package-install-selected-packages
```

Alternatively, restart Emacs, and `use-package` will automatically install any missing dependencies.

If any issues arise, check `*Messages*` buffer (`M-x view-echo-area-messages`) or start Emacs with debugging mode enabled (`emacs --debug-init`). What I tend to do is whenever I encounter any errors, I run emacs in minimal mode: `emacs -Q`, this loads emacs without the init.el file (if I can't pinpoint the exact error).

## Final Notes

This configuration optimises Emacs for efficient navigation, organisation, and shell integration. 
Everybodies configuration will differ based on their needs, so feel free to take and leave the parts as you wish!

For additional customisation, refer to the official package documentation:
- [General.el (Keybindings)](https://github.com/noctuid/general.el)
- [Evil Mode (Vim keybindings)](https://github.com/emacs-evil/evil)
- [Org Mode](https://orgmode.org/)
- [Neotree (File navigation)](https://github.com/jaypei/emacs-neotree)
