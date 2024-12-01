# TravelPlan Web Application

A web application designed to help users share their travel plans. The platform allows users to add, view, update, and delete travel plans, while also enabling them to view other's travel plans.

## Table of Contents

1. [Project Overview](#overview-of-project)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Requirements](#requirements)
5. [Installation & Setup](#installation-setup)

---

## Overview of Project

The **TravelPlan** web application allows users to:

- View and manage travel plans (add, edit, delete).
- Display travel plans linked to specific locations and users.
- View a list of all travel plans along with their location and travelers.
- Interact with a user-friendly interface built with **Material-UI** for seamless navigation and user experience.

The app has been designed with responsive features, animations, and a clean UI to make sharing travel plans both simple and enjoyable.

There are different validations in place so that the data that is received into the  server is good data. Some examples of the validations are below:
    The username must be unique. This is a column constraint in the user model.

    All fields in the form are required so no empty data can be submitted.

### Features

- **Travel Plan Management**: Add, edit, or delete travel plans easily. 
- **Location-Based Plans**: View all travel plans for a specific location.
- **Traveler-Specific Plans**: View all travel plans associated with a specific user.
- **Responsive Design**: The app adapts to various screen sizes using Material-UI's responsive grid system.
- **Smooth Animations**: The welcome page introduces interactive animations (Grow, Slide) to present the content dynamically.
---

## Technologies

The TravelPlan web application is built using the following technologies:

  - **React**: JavaScript library for building user interfaces.
  - **Redux**: For handling global state.
  - **Material-UI**: React component library for building responsive and modern UIs.
  - **React Router**: For handling navigation between different views.
  - **CSS**: Used for custom styling and animations.
  - **Flask**: A lightweight Python framework for building the backend APIs.
  - **Flask-SQLAlchemy**: ORM (Object-Relational Mapping) for database interaction.
---

## Requirements

To run this project locally, some of the programs you’ll need to have installed are listed below. For the full list refer to requirements.txt:

- **Python 3.8 or greater**
- **npm**
- **React** (v18+)
- **Material-UI** (for UI components)
- **Flask**
- **Flask-SQLAlchemy**
- **Flask-Migrate**
- **SQLAlchemy**

---

## Installation & Setup

To get started with the **TravelPlan** project, follow these steps:

**If any problems arise from using the set up below. Feel free to reach out with any questions.**

```bash
#Fork and cline the respository:
git clone https://github.com/spenceradler2/phase-5-final-project

#To add the requirements in the requirements file:
pip install -r requirements.txt

# To run the front end:
cd client 
npm run dev

#Initialize the database:
flask db init
flask db migrate
flask db upgrade

# To run the backend end:
pipenv shell
gunicorn -b 127.0.0.1:5555 --chdir ./server app:app

