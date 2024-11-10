# Proyecto Fina DDB - APP Policial

## Dev Tools 

1. [Python](https://www.python.org/downloads/)
2. [Node](https://nodejs.org/en/)
3. [DBeaver](https://dbeaver.io/)
4. [thunder client](https://www.thunderclient.com/)
5. [gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
6. [python extension](https://code.visualstudio.com/docs/languages/python)
7. [git](https://git-scm.com/)

## Pasos para ejecutar el proyecto
### Backend
activar el entorno virtual con visual studio 

1. pulsar F1
2. Escribir "Python: Select Interprete"


```
cd backend
.\venv\Script\activate
python .\src\app.py
```
o usando docker
```
    docker-compose up 
```

### Frontend
```
cd frontend    
npm i
npm run dev
```

## TODO List
* [ ] Login
* [ ] Delito
    * [ ] Se puede crear un delito sin captura
    * [ ] Reutilizar datos en caso del que el delincuente previamente exista o crear una nueva
    * [ ] 
* [ ] Delincuente
    * [ ] crear delincuente
    * [ ] Asignar delito o delitos
    * [ ] Colocar el policia que lo aresto
* [ ] Condena
    * [ ] lista de cargos
    * [ ] crud de cargos
* [ ] Arrestos
    * [ ] delitos
    * [ ] policias que hicieron el arrestos

# Biografia
* [que es la reseña policial](https://criminalisticabasic.blogspot.com/2016/03/la-resena-policial-de-undetenido-es.html)


System.out.println("mensaje de un lolero,pistolero que escucha ranmstein, esclaviza orcos, de derechas)
