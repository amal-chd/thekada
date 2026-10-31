# Kada auth emails

Firebase Auth (project `kada-restaurant-os-v1`, shared by all four Kada apps)
sends its emails with the action URL set to `https://www.thekada.in/auth/action`,
served by `public/auth/action.html` (password reset, email verification,
email-change recovery — Identity Toolkit REST, no SDK).

`reset-password.html` is the body of the password-reset template. Firebase
fills `%EMAIL%` and `%LINK%`. Don't use `%APP_NAME%`: it is the project's
public name ("Kada Dine"), wrong for customers, riders and hosts.

The logo it loads is `public/email/kada-icon.png` — keep that path stable,
sent emails point at it.
