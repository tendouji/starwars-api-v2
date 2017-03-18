# starwars-api-v2
This project has 2 main development parts, vanilla Javascript and jQuery with SASS generated CSS. All the sites are created to be responsive until 320px width.

Demo page can be [viewed here](https://tendouji.github.io/starwars-api-v2/index.html).


## Vanilla Javascript Development
This version is to demonstrate development via the most basic Javascript codes without extending any 3rd party library.
Records are called via **XMLHttpRequest()** and on complete, it will loop to next call until all records have been received.


## jQuery + SASS Development
This version is has a much more simplified code, via extending jQuery library.
Records are called synchronously using **Promise()**.

The stylesheet for this version is created using SASS (hence, there are **node_modules** files to run SASS watcher and generate CSS on the fly). The initial SASS stylesheet is located in [scss/style.scss](https://github.com/tendouji/starwars-api-v2/blob/master/scss/style.scss) and the "messily"-generated CSS is located in [css/sass.css](https://github.com/tendouji/starwars-api-v2/blob/master/css/sass.css).


## Further 
For the other Angular2 repo README, [check here](https://github.com/tendouji/starwars-ng/blob/master/README.md).
