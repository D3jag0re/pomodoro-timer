# Pomodoro Timer

This is based off the DevOps Roadmap Project [Pomodoro Timer](https://roadmap.sh/projects/nodejs-service-deployment)

Create a pomodoro tracker application for productivity

This is an intermediate [DevOps Project](https://roadmap.sh/devops/projects) as per roadmap.sh

## Description From Site 

The goal of this project is to learn and practice frontend development skills by building a `Pomodoro Timer`, a productivity tool based on the Pomodoro Technique. The Pomodoro Technique is a time management method that uses a timer to break work into intervals (typically 25 minutes) separated by short breaks.

By completing this project, you will enhance your frontend development skills while building a functional and customizable Pomodoro Timer application. This knowledge will prepare you for more advanced projects and improve your ability to create interactive and user-friendly web applications.

## Requirements

You will create a Pomodoro Timer web application using the frontend framework of your choice e.g. React, Vue or Angular. Here is the list of requirements for the application:

    User should be able to start stop and resume a pomodoro timer.

    User should be able to configure the default interval configuration; default work session should be 25 minutes, short break should be 5 minutes and longer break after 4 work sessions should be 15 minutes.

    Application should display the current session type (e.g., Work, Short Break, Long Break).

    It should also track the number of tracked work sessions

    Play a sound when a session ends to notify the user.

    Ensure the app is accessible and visually appealing on both desktop and mobile devices.

You can use any existing pomodoro apps for the UI inspiration e.g.

    time.fyi - Pomodoro Timer

    Pomofocus - Pomodoro Tracker


### Technical Requirements

- Use `HTML`, `CSS`, and `JavaScript` (or a frontend framework/library such as React, Vue, or Angular).

- Implement state management for the timer and session tracking.

- Use a modular and reusable code structure.

- Maintain proper accessibility standards (e.g., keyboard navigation, ARIA labels).

- Can be deployed on GitHub Pages, Vercel, or Cloudflare pages


### Stretch Goals


- (blank)

## prerequisites

- Setup the following repository secrets:
    - DO_TOKEN : Digital Ocean access token
    - DO_SPACES_SECRET_KEY : Digital Ocean spaces secret key (for Terraform state file)
    - DO_SPACES_ACCESS_KEY : Digital Ocean spaces access key (for Terraform state file)
    - DO_SSH_PUBLIC_KEY_BASTION : Keypair to be used for Bastion Host VM 
    - DO_SSH_PRIVATE_KEY_BASTION : Keypair to be used for Bastion Host VM
    - DO_SSH_PUBLIC_KEY_PRIVATE : Keypair to be used for Private VM 
    - DO_SSH_PRIVATE_KEY_PRIVATE : Keypair to be used for Private VM

## To Run  

- (blank)


## Notes 

- (blank)

## Lessons Learned

- (blank)