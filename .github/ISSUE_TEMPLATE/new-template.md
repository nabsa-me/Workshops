name: My Template
description: Some task templating
title: "This is a task template"
labels: ["AWS", "devOps"]
body:
- type: textarea
  id: workshop_tasks
  attributes:
    label: Workshop tasks and roadmap
    value: |
      **Debug environment**
      - [ ] event files
      - [ ] config .launcher
      
      **Local Stack & AWS toolkit**
      - [ ] Task 1
      - [ ] Task 2 
      
      **Jest**
      - [ ] Task 1
      - [ ] Task 2
      
      **JSDocs documentation**
      **Readme**
