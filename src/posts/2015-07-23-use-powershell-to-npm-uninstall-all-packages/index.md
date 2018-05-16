---
type: 'blog'
slug: "/use-powershell-to-npm-uninstall-all-packages/"
title: Use PowerShell to npm uninstall all packages
date: "2015-07-23T14:18"
description: Using PowerShell to overcome node_modules directory woes.
tags:
  - dev
  - cli
  - npm
  - package mananger
  - powershell
published: true
---

Recently I needed to delete all npm package folders which had been installed into the `node_modules` directory of a project. Attempting to manually delete the folders occasionally failed due to the [maximum path length limitation](https://msdn.microsoft.com/en-us/library/aa365247%28v=vs.85%29.aspx#maxpath) Windows imposes. I didn't fancy running `npm uninstall` for each package individually as there were a lot of them, and knowing that I would likely need to repeat this task again I decided to try my hand at writing some PowerShell to uninstall each package listed in either the `devDependencies` section of `package.json`, or in the `node_modules` directory itself.

## Uninstall packages, attempt one

First up I wrote a function which removes package folders added by a reference in `devDependencies`.

```bash
Function Uninstall-NpmPackagesInDevDependencies {
    Param (
        # Optional path to package.json
        [String]$pathToPackage= $(Resolve-Path "package.json")
    )

    # Read the json content
    $json = (Get-Content $pathToPackage -Raw) | ConvertFrom-Json

    # Loop over each package in devDependencies
    ForEach ($dep in ($json.devDependencies | Get-Member -MemberType *Property).Name) {
        # Uninstall the package
        iex "npm uninstall $dep"
    }
}
```

It works! However a few pesky folders still remained as they were saved in another section of the `package.json`.

## Uninstall packages, attempt two

To deal with the leftover folders I created a second function which loops over all folders in the `node_modules` directory and uses the name of each folder to uninstall the package.

```bash
Function Uninstall-NpmPackagesInNodeModules {
    Param (
        # Optional path to node_modules directory
        [String]$pathToNodeModules = (Get-Item ".\node_modules").FullName
    )

    Get-ChildItem $pathToNodeModules | ForEach {
        # Uninstall the package
        iex "npm uninstall $($_.Name)"
    }
}
```

Trying out slightly different ForEach syntax for a bit of fun, I managed to remove all directories, regardless of whether the packages were saved in `package.json` or the path length was too long.

## One liners

After some further searching online I came across a nice [bash command](http://blog.legacyteam.info/2014/10/how-to-remove-all-local-npm-packages/) for this sort of thing:

```bash
for package in `ls node_modules`; do npm uninstall $package; done;
```

Which led me to wonder what the equivilent would be if I shortened the `Uninstall-NpmPackagesInDirectory` function.

Stripping the function right back, and substituting method names for their shorter aliases resulted in

```bash
ls (gi ".\node_modules").FullName | % { iex "npm uninstall $($_.Name)" }
```

It doesn't read as well as the bash command, but I don't think it's too bad.

Just for the hell of it I thought I'd have a go at shortening the `Uninstall-NpmPackagesInDevDependencies` function as well, the result:

```bash
($(gc "package.json" -raw) | convertfrom-json).devdependencies | gm -membertype *property | % { iex "npm uninstall $dep" }
```

Not likely to remember that one off the top of my head the next time I need to use it..
