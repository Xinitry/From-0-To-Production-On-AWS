# From 0 to Production on AWS

Welcome to the **From 0 to Production on AWS** repository — the companion repo for our YouTube series where we **solve frustrating AWS problems** that developers face in real-world projects.  

We don’t give step-by-step tutorials.  
We give you **real-world solutions to real-world problems**.  
Each branch in this repo corresponds to one video in the series, containing the exact code, configuration, or documentation shown in that episode.

---

## 📺 About the Series

Building on AWS can be powerful… and painfully confusing.  
Instead of “Hello World” demos, we jump straight into the **actual problems** you’ll hit on the road to production, like:

- Services not talking to each other  
- Cryptic error messages  
- Misleading defaults that break your app  
- “It works locally, but not in AWS” headaches  

Every video is focused on one issue — what’s wrong, **why** it happens, and how to fix it.

---

## 🗂 Repository Structure

The `main` branch contains:
- This README  
- General documentation and references  
- Links to all episode branches

Each **episode branch** contains:
- The resources/code from that specific video
- README specific to that episode

---

## 📚 Episode Index

| Episode | Problem Title | Branch |
|---------|---------------|--------|
| 1 | Your VPC Lambda Can’t See Secrets (Here’s Why) | [`S1-VPC-Lambda-SecretsManager`](https://github.com/xinitry/From-0-To-Production-On-AWS/tree/S1-VPC-Lambda-SecretsManager) |
| 2 | API Gateway Breaks Your Lambda (Here's Why) | [`S2-ApiGateway-Breaks-Lambda`](https://github.com/xinitry/From-0-To-Production-On-AWS/tree/S2-ApiGateway-Breaks-Lambda) |
| 3 | Cognito Settings You Overlooked (Complete Setup Guide) | [`S3-Cognito-Setup`](https://github.com/xinitry/From-0-To-Production-On-AWS/tree/S3-Cognito-Setup) |
| 4 | You Logged In but Can’t Find Your Token (Here’s Why) | [`S4-Cognito-Tokens`](https://github.com/Xinitry/From-0-To-Production-On-AWS/tree/S4-Cognito-Tokens) |

*(Links will point to each episode’s branch once published.)*

---

## 🚀 Follow Along

- **YouTube Playlist:** [From 0 to Production on AWS](https://youtube.com/...)  
- **Author:** [Xinitry](https://xinitry.com)  

---

**⚠️ SECURITY DISCLAIMER**

This code is provided as-is for educational and development purposes. While efforts have been made to ensure correctness, it is **your responsibility** to:
- Review and validate the code before use
- Ensure it meets your security requirements
- Test thoroughly in a non-production environment
- Never commit credentials to version control
- Follow your organization's security policies

**DO NOT use this code in production without proper security review and testing.**

---

## 📜 License

This repository is licensed under the [MIT License](LICENSE).

