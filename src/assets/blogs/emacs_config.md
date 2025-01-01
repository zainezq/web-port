# Crafting a Customised Emacs Configuration for Productivity and Aesthetics

Emacs is a powerhouse editor that can be tailored to your specific needs, and this blog showcases how I built my Emacs configuration to enhance my productivity and enjoyment. I primarily use Emacs to organise my notes, applications, books, projects and various other things. 

---

## **1. Package Management**

The first step in customising Emacs is setting up package management. I’ve used MELPA as my primary package repository:

```elisp
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)
```

The snippet below shows you how to view the available packages.

```elisp
M-x package-list-packages
```
---

## **2. Scripts and Custom Modules**

To keep my configuration modular, I’ve organised custom scripts in a `~/.emacs.d/scripts/` directory:

```elisp
(add-to-list 'load-path "~/.emacs.d/scripts/")
(require 'displays)
(require 'shells)
(require 'auto-comp)
(require 'window)
(require 'keyboard)
(require 'custom-agenda)
```

Each of these are `.el` files, and are being loaded into my main `init.el` 

---

## **3. General Settings**

### Startup Optimization

```elisp
(setq inhibit-startup-screen t)
```

I disable the startup screen so that the first thing that loads up is the dashboard (more on this later).

### Key Bindings

I use `ESC` as a universal escape key to quit minibuffer prompts:

```elisp
(global-set-key [escape] 'keyboard-escape-quit)
```

As opposed to using `C-g` (boo!!).

### Interface Tweaks


```elisp
(menu-bar-mode -1)
(scroll-bar-mode -1)
(global-display-line-numbers-mode 1)
(global-visual-line-mode t)
```

These settings remove clutter like scrollbars and enable essential features such as line numbers.

---

## **4. Org Mode for Organization**

### Agenda and File Management

Org mode is central to my workflow. I’ve set up an agenda that pulls from multiple files:

```elisp
(setq org-agenda-files '("~/master-folder/org_files/master.org"
                         "~/master-folder/org_files/deen-org/deen.org"
                         "~/master-folder/org_files/career-org/career.org"))
(require 'org)
```

### Enhancing Org Mode Appearance

- Inline images:

  ```elisp
  (add-hook 'org-mode-hook 'org-display-inline-images)
  (add-hook 'org-mode-hook
            (lambda ()
              (org-display-inline-images t t)))
  ```

- Bullets and indentation:

  ```elisp
  (use-package toc-org
    :commands toc-org-enable
    :init (add-hook 'org-mode-hook 'toc-org-enable))

  (use-package org-bullets)
  (add-hook 'org-mode-hook (lambda () (org-bullets-mode 1)))
  (add-hook 'org-mode-hook 'org-indent-mode)
  ```

### Disabling Electric Indent

Org files often require manual formatting:

```elisp
(electric-indent-mode -1)
```

---

## **5. Enhancing Visual Appeal**

I’ve added themes and icons to create a visually appealing environment:

- **Kaolin Bubblegum Theme:**

  ```elisp
  (add-to-list 'custom-theme-load-path "~/.emacs.d/themes/")
  (require 'kaolin-themes)
  (load-theme 'kaolin-bubblegum t)
  ```

- **All-the-Icons:**

  ```elisp
  (use-package all-the-icons :ensure t :if (display-graphic-p))
  (use-package all-the-icons-dired
    :hook (dired-mode . (lambda () (all-the-icons-dired-mode t))))
  ```

---

## **6. Roam and Note-Taking**

Org-roam is perfect for building a network of interconnected notes:

```elisp
(use-package org-roam
  :ensure t
  :custom
  (org-roam-directory "~/master-folder/org_files/org_roam")
  :config
  (org-roam-setup))
```

---

## **7. Language Support**

I’ve configured Emacs for Haskell development:

```elisp
(use-package haskell-mode)
(org-babel-do-load-languages
 'org-babel-load-languages
 '((haskell . t)))
```

---

## **8. Backup Settings**

To prevent clutter, backups are redirected to the Trash folder:

```elisp
(setq backup-directory-alist '((".*" . "~/.Trash")))
```

---

## **9. Evil Mode for Vim Lovers**

Evil mode brings Vim keybindings to Emacs, with additional enhancements:

```elisp
(use-package evil
  :init
  (setq evil-want-integration t
        evil-want-keybinding nil
        evil-vsplit-window-right t
        evil-split-window-below t)
  (evil-mode))

(use-package evil-collection
  :after evil
  :config
  (setq evil-collection-mode-list '(dashboard dired ibuffer))
  (evil-collection-init))

(use-package evil-tutor)
```

---

## **10. Reloading Configuration**

For quick testing of changes:

```elisp
(defun reload-init-file ()
  (interactive)
  (load-file user-init-file)
  (load-file user-init-file))
```

---

## **11. Scripts**

As previously mentioned, I’ve kept scripts in a `~/.emacs.d/scripts/` directory:

```elisp
(add-to-list 'load-path "~/.emacs.d/scripts/")
(require 'displays)
(require 'shells)
(require 'auto-comp)
(require 'window)
(require 'keyboard)
(require 'custom-agenda)
```

Each of these can be found in my GitHub repository: [emacs-config](https://github.com/zainezq/emacs-config)

---

## **12. Conclusion**

This is the end of my customised Emacs configuration, for more details I would recommend checking out this YouTube series: [DistroTube  - Configuring Emacs](https://www.youtube.com/playlist?list=PL5--8gKSku15e8lXf7aLICFmAHQVo0KXX). I hope you find it useful :)
