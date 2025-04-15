Tomando como base lo visto en clase:
1. Crear un proyecto primer-tp
2. Crear un repositorio privado en github con el nombre: "SU NOMBRE Y APELLIDO - TP1 - PROG4 2025 C1". La próxima les pido que me agreguen como colaborador.
3. Crear en la carpeta pages los componentes: 
login
registro
bienvenida
sobre-mi

4. En registro.component que cuente con un FormGroup y las validaciones necesarias para los campos:
nombre: string
apellido: string
edad: number

5. Crear el servicio db.service y utilizar supabase para guardar el usuario registrado en la base de datos

6. Crear el servicio github.service y utilizar el HttpClient que vimos en la clase 03 (miércoles 08/04) para traer sus datos por GET de la api de github. La api se compone de la siguiente 

forma: 
https://api.github.com/users/{su-usuario}

Ejemplo:
https://api.github.com/users/afriadenrich

7. Utilizar una plantilla, alguna librería o crear su propio html y css para mostrar al menos 3 datos (nombre de usuario e imagen incluidos) obtenidos a través del github.service en el sobre-mi.component. 
Si no se entiende el concepto de la page sobre-mi, acá hay ejemplos.

8. Subir todo al repo de github que crearon, la próxima les pido que me agreguen como colaborador.

Nota: Recuerden aplicar plantillas en toda la app, no hace falta que pasen mucho tiempo con eso, con que se vea relativamente bien es suficiente. Traten de mantener una línea de estilo uniforme a lo largo de la app, a los clientes reales les gusta eso.