Zanim odpalisz projekt:
===========================

1.  Zainstaluj node https://nodejs.org/en/download/

2.  Zainstaluj gulpa
**npm install --global gulp-cli** (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)


Rozpoczynamy pracę:
===========================
1.  Instalujemy node_modules poleceniem   
    **npm install**  

2.  Odpalamy gulpa poleceniem  
	**gulp**  
	Włącza się watch dla scss i skryptów.  
	Od tego momentu pracujemy w katalogu src.  

    Teraz tak:  
	*  Skrypty js znajdują się w katalogu **src/js**. Wszystkie js z tego katalogu zostaną złączone w jeden plik i zapisane w js/scripts.min.js  	
    *  Skompilowane scss trafiają do **css/styles.min.css**. Dostają autoprefixera, więc prefixy cię nie interesują.  
	

Usuwanie node_modules    
===========================
   Node_modules ma w sobie bardzo duzo plików, przez co tradycyjne usuwanie jest bardzo długie. Jeżeli zajdzie potrzeba usunięcia tego katalogu, skorzystaj z polecenia:
   **del /f/s/q node_modules > nul**
  
   Node_modules ma błąd polegający na kiepskiej strukturze katalogów. Powoduje to, że czasami w Windowsie nie da się tego katalogu usunąć (zbyt długie ścieżki do plików). Aby poradzić sobie z tym problemem, instalujemy rimraf:
   **npm install rimraf -g**

   a następnie przechodzimy do katalogu z node_modules i usuwamy node_modules:
   **rimraf node_modules**
