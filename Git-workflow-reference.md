Thanks Dylan!

## Step 1:

- navigate to your local repo in VS code

## Step 2:

- git [ your branch ] => [ *branch ] indicates which branch you are on

## Step 3:

- git checkout staging => if not already on staging branch

## Step 4:

- git checkout -b [ your branch ] => creates a new branch off of staging

## Step 5: do some work on your local repo

- [ when you are ready to commit ]

## Step 6:

- git add .

## Step 7:

- git status

## Step 8:

- git commit -m ‘[ message ]’

## Step 9:

- git push origin [ your branch ] => NOT main branch

## [ Go to GitHub and open a new pull request for your branch]

- [base: STAGING compare: [ your branch ] ]

## Step 10:

- git checkout staging

## Step 11:

- git merge origin [ your branch ] or git pull origin staging to update local
  staging branch

- [ Team will review staging branch then merge into main]

## DELETING FEATURE BRANCHES

## list remote branches

- git branch -r

## Delete local branch

- git branch -d [ your branch ]

## Delete remote branch

- git push --delete origin [ your branch ]

## Remove unneeded remote tracking branches

- git remote prune origin [ your branch ]
