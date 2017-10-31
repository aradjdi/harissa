Databurst
- En recette
  - changer l'url pour la GetAway (Hassene Belgacem, Nicolas Bret)
  - builder
  - tester
  - mettre sur appaloosa REC

- En Prod
  - changer l'url pour la GetAway (Hassene Belgacem, Nicolas Bret)
  - builder
  - tester
  - mettre sur appaloosa PROD

SAV
- Fixer les problèmes de royaume local et externe (Marc Rabahi)
- Mapper les urls manquantes à la GetAway (Marc Rabahi, Nicolas Bret)
- Livrer sur Appaloosa REC
- Préparer la mise en prod (Amandine JOAO)


ROADMAP
- Variabiliser les templates de templates/app/src
  - Proposer un choix de templates lors de `harissa init`
  - Utiliser des repos GIT
- Réécrire le client appaloosa-client.rb en node pour supprimer la dépendance à Ruby
- Ajouter le tag et le push sur GIT lors d'une release

- Afficher la progression des commandes

- Gérer les variables de conf avec DefinePlugin

- Simplifier l'app de templates/app/src

- Implementer le run des tests et du coverage


MISC

- bug les applis Android sont compatibles mobile et tablet et il faut que mobile ou que tablet

- bug lors du `cordova build ios --release --device` avec xCode9 et la platform ios en version 4.5.2
  - fixer avec la platform ios du repo master d'apache

- bug de ChildProcessError: stdout maxBuffer exceeded avec le module child-process-promise
  - fixer en augmantant le maxBuffer

- bug lors de l'appel à Appaloosa.autoUpdate() sur Android, l'appli crashes avec un NullPointerException

- bug lors de l'appel à Appaloosa.authorization() sur Android. Une SecurityException est levée
  - fixer avec le plugin cordova-plugin-android-permissions


PENSE BETE

- les command pour builder SAV
  comme mercalys

- les command pour builder Databurst
  gulp build

- en prod penser à changer le storeToken et le storeId dans le wrapper js appaloosa

- https://store.mousquetaires.com/8267-rec-store/



TODO

Test Appaloosa update on iOS

Find a solution for Appalooa update on Android

Fix misunderstands provisioning profile

webpackCommandUtils.compileProject(compiler)
  - accept a config or a compiler to simplify code for webpack build

Avoir une meilleur stack d'erreur, éviter ce genre de stack
  - Error: ENOENT: no such file or directory, mkdir '/Users/ahmedradjdi/Development/GitRepos/HarissaTest1/app/cordova/smartphone'
  - `cordova create /Users/ahmedradjdi/Development/GitRepos/HarissaTest1/app/cordova/smartphone com.mousquetaires.helloworld HelloWorld --template /Users/ahmedradjdi/Development/GitRepos/Harissa/scripts/templates/cordova/smartphoneTpl` (exited with error code 1)
      at callback (/Users/ahmedradjdi/Development/GitRepos/Harissa/node_modules/child-process-promise/lib/index.js:33:27)
      at ChildProcess.exithandler (child_process.js:277:5)
      at emitTwo (events.js:125:13)
      at ChildProcess.emit (events.js:213:7)
      at maybeClose (internal/child_process.js:927:16)
      at Process.ChildProcess._handle.onexit (internal/child_process.js:211:5)