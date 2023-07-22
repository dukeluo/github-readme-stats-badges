# Github Readme Stats Badges

> Enhance your GitHub Readme with stats badges such as total downloads of npm packages or number of GitHub Stars.

## How to use

### `npm` Packages Downloads

#### Endpoint

```
https://github-readme-stats-badges.vercel.app/api/downloads?author={npm-username}
```

#### Markdown

```md
![](https://img.shields.io/badge/dynamic/json?label={label}&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/downloads?author={npm-username})
```

#### Example

```md
![](https://img.shields.io/badge/dynamic/json?label=npm%20downloads&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/downloads?author=dukeluo)
```

![](https://img.shields.io/badge/dynamic/json?label=npm%20downloads&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/downloads?author=dukeluo)

### GitHub Stars

#### Endpoint

```
https://github-readme-stats-badges.vercel.app/api/github/stars?user={github-username}
```

#### Markdown

```md
![](https://img.shields.io/badge/dynamic/json?label={label}&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/github/stars?user={github-username})
```

#### Example

```md
![](https://img.shields.io/badge/dynamic/json?label=github%20stars&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/github/stars?user=dukeluo)
```

![](https://img.shields.io/badge/dynamic/json?label=github%20stars&query=$.count&url=https://github-readme-stats-badges.vercel.app/api/github/stars?user=dukeluo)
