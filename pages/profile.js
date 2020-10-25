const profilePage = (name, surname) => (`
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Лабораторная номер 2</title>
</head>
<body>
    <div>
        <span>${name} ${surname}</span>
    </div>
</body>
</html>
`);

module.exports = {
    profilePage
};
