# Dinning Philosophers
### By Jesse Riggs
Dinning Philosophers is an animated demonstration of a famous concurrency problem.
## Premis
Phliosophers are attempting to eat spaghetti with chopsticks, but there are not enough chopsticks for each philosopher; so they must share. Each chopstick is protected with a semaphore. Two solutions show how semaphores can be used to solve concurrency problems.
## Contents
This repository contains two sub-directories, each contains a different animation. Each directory contains an index.html, which contains the animation page; a knova.js, which contains the konva library used to generate a stage and animation; and a phil.js which builds and directs the animation.

The directory named **deadlock** conatins a broken solution, and demonstrates how semaphores can experience deadlock.

The directory named **correction** conatins the solution to the deadlock problem.
## Usage
The index.html included in each sub-directory can be openned directly with a browser, like Firefox or Chrome. The content of these directories can be installed on a server in the application root ( i.e. /var/www/html/ ).
