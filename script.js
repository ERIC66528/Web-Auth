document.getElementById('authenticateButton').addEventListener('click', authenticate);

async function authenticate() {
    const statusElement = document.getElementById('status');

    if (!window.PublicKeyCredential) {
        statusElement.textContent = 'WebAuthn API is not supported in this browser.';
        return;
    }

    statusElement.textContent = 'Authenticating....';
   try {
        const publicKey = {
            challenge: new Uint8Array(32),
            rp: {
                name: "Eric Pixel Droid",
                id: "eric-pixel-droid.github.io"
            },
            user: {
                id: new Uint8Array(16),
                name: "user@example.com",
                displayName: "User Name",
            },
            pubKeyCredParams: [
                {
                    type: "public-key",
                    alg: -7 // ES256
          }
            ],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required"
            },
            timeout: 60000,
            attestation: "direct"
        };

        const credential = await navigator.credentials.create({ publicKey });

        statusElement.textContent = 'Authentication successful!';
        console.log('Credential:', credential);

        // Send the credential to your server for verification
        // Example: sendCredentialToServer(credential);

        // Redirect to your website or perform further actions
        window.location.href = 'https://eric-pixel-droid.github.io/rictei-pixel/';
    } catch (error) {
        console.error('Authentication failed:', error);
        statusElement.textContent = 'Authentication failed: ' + error.message;
    }
}
