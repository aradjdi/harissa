# Bugs
- Ajouter un step de création de provisionning profile dans pendant 'harissa init' 
- bug de ChildProcessError: stdout maxBuffer exceeded avec le module child-process-promise
  - fixer en augmantant le maxBuffer
  - voir child process
  - voir spawn
- bug lors de l'appel à Appaloosa.autoUpdate() sur Android, l'appli crashes avec un NullPointerException
- bug lors de l'appel à Appaloosa.authorization() sur Android. Une SecurityException est levée
  - fixer avec le plugin cordova-plugin-android-permissions
- Avoir une meilleur stack d'erreur, éviter ce genre de stack (voir chalk)
-

#TODO
- les montées de versions devraient se faire sur l'environnement de dev et puis les release preprod et prod
devraient prendre la version de l'environnement en dessous de lui (preprod < dev et prod < preprod) 
