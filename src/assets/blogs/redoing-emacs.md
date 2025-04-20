# Redoing Emacs Configuration File

By Zaine Qayyum

---

## Table Of Contents:
- [init.el](#init.el)
- [auto-comp.el](#auto-comp.el)
- [Compile](#compile)

It's been a while since I was able to mess around with my Emacs configuration, and now I finally got the chance to make some changes. I was recently reading about how the senior developers approach programming, and it was quite fascinating to see how often they consult documentations. Instead of googling things or using LLM's, they refer to the source code or official documentation's whenever they want to find out about something. There was one particular developer who is an expert in the C programming language, and he gave the advice of saying the best way to learn is to play around with the code. Now this may seem intuitively straightforward, but when put in practice yields so much benefit. 

Anyways, based on this realisation, I decided to use the time I had to redo my emacs config so that I can start using it for two main things:

- Programming in C and Java
- GTD (Getting Things Done)

The former is the topic of this blog (I was thinking of leaving the latter for another blog due to it's complexity and how deep I've fallen down that rabbit hole).

## init.el

As always, emacs looks for an initialization file from which it can evaluate configurations. I've kept mine quite minimal this time, focussing on the essentials:

```elisp

(setq custom-file "~/.emacs.d/custom.el")
(load-file custom-file)

(require 'package)
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("gnu" . "https://elpa.gnu.org/packages/")))
(package-initialize)
(require 'use-package)

(add-to-list 'load-path "~/.emacs.d/local/")

(menu-bar-mode 0)
(tool-bar-mode 0)
(global-display-line-numbers-mode)
(scroll-bar-mode 0)
(keycast-header-line-mode)

(require 'simpc-mode)
(add-to-list 'auto-mode-alist '("\\.[hc]\\(pp\\)?\\'" . simpc-mode))

(require 'general)
(require 'keyboard)
(require 'custom-agenda)
(require 'auto-comp)

```

You may notice that the `custom-set-variables` are stored in another file. I had no idea this was a thing you could do, and honestly it reduces much of the bloat that gets appended to the initialization file anyways so that's a plus. The `simpc-mode`[^1] is used a lightweight syntax highlighter for C, and the rest of the `.el` files are stored seperately. Most are imported from my previous config, however, since I'm now relying more on the `custom-set-variables` and less on the `use-package` to do things for me, there is a significantly less amount of code that used to do the same thing before. The main file for programming using emacs is the `auto-comp.el` (yes, I know it's a terrible name for it but I couldn't be bothered renaming it).

## auto-comp.el

The file has the following contents:

```elisp

;; Corfu (Completion UI)
    (use-package corfu
      :ensure t
      :custom
      (corfu-cycle t)
      (corfu-auto t)
      (corfu-auto-prefix 2)
      (corfu-auto-delay 0)
      (corfu-popupinfo-delay '(0.5 . 0.2))
      (corfu-preview-current 'insert)
      (corfu-preselect 'prompt)
      (corfu-on-exact-match nil)
      :bind (:map corfu-map
                  ("M-SPC"      . corfu-insert-separator)
                  ("TAB"        . corfu-next)
                  ([tab]        . corfu-next)
                  ("S-TAB"      . corfu-previous)
                  ([backtab]    . corfu-previous)
                  ("S-<return>" . corfu-insert)
                  ("RET"        . corfu-insert))

      :init
      (global-corfu-mode)
      (corfu-history-mode)
      (corfu-popupinfo-mode) ; Popup completion info
      :config
      (add-hook 'eshell-mode-hook
                (lambda () (setq-local corfu-quit-at-boundary t
                                       corfu-quit-no-match t
                                       corfu-auto nil)
                  (corfu-mode))
                nil
                t))

(use-package cape
  :ensure t
  :init
  (add-to-list 'completion-at-point-functions #'cape-file)
  (add-to-list 'completion-at-point-functions #'cape-keyword))

;; --- yasnippet (snippets support) ---
(use-package yasnippet
  :ensure t
  :config
  (yas-reload-all)
  (add-hook 'prog-mode-hook #'yas-minor-mode))

(use-package lsp-mode
  :ensure t
  :custom
  (lsp-completion-provider :none) ;; Required for Corfu
  (lsp-completion-show-detail t)
  (lsp-completion-show-kind t)
  (lsp-enable-snippet t)
  :init
  (add-hook 'simpc-mode-hook #'lsp) ;; Enable LSP in simpc-mode
  :hook ((java-mode . lsp))
    )

(with-eval-after-load 'lsp-mode
    (add-to-list 'lsp-language-id-configuration '(simpc-mode . "cpp"))
  (lsp-register-client
   (make-lsp-client
    :new-connection (lsp-stdio-connection "clangd")
    :major-modes '(simpc-mode)
    :server-id 'clangd))

    (add-to-list 'lsp-language-id-configuration '(java-mode . "java")))

(setq lsp-java-format-settings-url "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml"
      lsp-java-format-settings-profile "GoogleStyle")
(use-package lsp-java
  :ensure t
  :after lsp
  :config (add-hook 'java-mode-hook #'lsp))



;; Hook to improve CAPF behavior in lsp-mode
(add-hook 'lsp-completion-mode-hook
          (lambda ()
            (setq-local completion-at-point-functions
                        (list (cape-capf-super
                               #'lsp-completion-at-point
                               #'cape-dabbrev)))))

;; --- LSP UI (pop-up docs, signature help) ---
(use-package lsp-ui
  :ensure t
  :commands lsp-ui-doc-glance
  :bind (:map lsp-mode-map
              ("C-c C-d" . lsp-ui-doc-glance)))




(use-package projectile
  :config
  (projectile-mode 1))

(use-package counsel
  :after ivy
  :config (counsel-mode))

(use-package ivy
  :bind
  (("C-c C-r" . ivy-resume)
   ("C-x B" . ivy-switch-buffer-other-window))
  :custom
  (setq ivy-use-virtual-buffers t)
  (setq ivy-count-format "(%d/%d) ")
  (setq enable-recursive-minibuffers t)
  :config
  (ivy-mode 1))

(use-package all-the-icons
  :ensure t
  :if (display-graphic-p))

(use-package all-the-icons-ivy-rich
  :ensure t
  :init (all-the-icons-ivy-rich-mode 1))

(use-package ivy-rich
  :after ivy
  :ensure t
  :init (ivy-rich-mode 1) ;; this gets us descriptions in M-x.
  :custom
  (ivy-virtual-abbreviate 'full
   ivy-rich-switch-buffer-align-virtual-buffer t
   ivy-rich-path-style 'abbrev))

(provide 'auto-comp)


```

You can see in this file, there are many things being done. The first is setting up `corfu`; I had an issue with this clashing with `company` so I disabled the latter and stuck with this for code completion. Next is `lsp-mode`, this is where the magic happens when working with C and Java files. Essentially, lsp stands for **Language Server Protocol**, and is a standardised way for code editors and IDE's to communicate with the language server, thereby providing them with features like code completion and error detection. The code above is setup for c, c++ (although I don't really use this), and Java. The screenshot below shows what it looks like with Java (the theme looks good doesn't it [^2])

![Inventory Class](./assets/inventory_java.png)

Below is a screenshot of a c programme:

![Main Class](./assets/c_example.png)

## Compile

One other thing to point out is the `compile` feature in emacs. I had no idea how feature rich this thing is; I've actually re-mapped some keybindings to make it easier to use this:

```elisp

  (dt/leader-keys
    "x" '(:ignore t :wk "Compilation")
    "x x" '(compile :wk "compile")
    ) 

```

Thanks for reading!

[^1]: https://github.com/rexim/simpc-mode
[^2]: https://github.com/ogdenwebb/emacs-kaolin-themes
