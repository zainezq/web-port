
# Guide to SSH Keys and GitLab

By Zaine Qayyum

---

## What are SSH Keys?

SSH (Secure Shell) keys are a pair of cryptographic keys that can be used to secure communication between two parties. One key is private, and it should be kept secure on your local machine, while the other key is public and can be shared with others. SSH keys are commonly used for authentication, allowing secure access to remote servers and services without the need for a password.

## Generating SSH Keys

To generate an SSH key pair, follow these steps:

### Step 1:

-   Open a terminal on your local machine.
-   Use the following command to generate a new SSH key:

`ssh-keygen -t rsa -b 2048 -C "example key"`

-   Press Enter to accept the default file location and provide a secure passphrase when prompted.
-   Two files, `id_rsa` (private key) and `id_rsa.pub` (public key), will be generated in the `~/.ssh/` directory.

### Step 2:

Adding SSH Key to the SSH Agent

-   Start the SSH agent:

`eval "$(ssh-agent -s)"`

-   Add your private key to the SSH agent:

`ssh-add ~/.ssh/id_rsa`

### Step 3:

Adding SSH Key to GitLab/GitHub

-   Copy the contents of your public key:

`cat ~/.ssh/id_rsa.pub`

-   Log in to your GitLab/GitHub account.
-   Navigate to Settings > SSH Keys.
-   Paste the copied public key into the "Key" field and give it a descriptive title.
-   Click Add Key.

## Testing SSH Connection

To test if your SSH key is set up correctly:

`ssh -T git@git.test.com`

You should see a message indicating a successful connection.

## Using SSH with Git

-   Change the remote URL of your Git repository to use SSH:

`git clone git@git.test.com/repo`

Replace repo with the repository you want to clone.

-   Now you can push and pull from GitLab without entering a username and password.

## Managing Multiple SSH Keys

If you use multiple SSH keys for different services, you can configure them in the SSH config file:

1.  Open (or create) the SSH config file:
    
    ```
    nano ~/.ssh/config
    ```
    
2.  Add the following configuration:
    
    ```
    Host gitlab.com
        HostName gitlab.com
        User git
        IdentityFile ~/.ssh/id_rsa_gitlab
    
    Host github.com
        HostName github.com
        User git
        IdentityFile ~/.ssh/id_rsa_github
    ```
    
3.  Save and exit the file. This allows you to use different SSH keys for different services.
    

## Troubleshooting SSH Issues

If you encounter any issues with SSH authentication, try the following:

1.  Ensure the SSH agent is running:
    
    ```
    eval "$(ssh-agent -s)"
    ```
    
2.  Verify that your SSH key is added:
    
    ```
    ssh-add -l
    ```
    
3.  Check file permissions to ensure the private key is secure:
    
    ```
    chmod 600 ~/.ssh/id_rsa
    ```
    
4.  Debug SSH connection issues:
    
    ```
    ssh -vT git@git.test.com
    ```
    
5.  Ensure your public key is correctly added to GitLab/GitHub.

By following these steps, you can securely authenticate with GitLab using SSH and make your workflow alot more streamlined.
