let tableRoles;

document.addEventListener('DOMContentLoaded', function(){

	tableRoles = $('#tableRoles').dataTable({
		"aProcessing": true,
		"aServerSide": true,
		"language": {
			"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
		},
		"ajax": {
			"url": " "+base_url+"/Roles/getRoles",

			"dataSrc":""
		},
		"columns": [
			{"data": "idrol"},
			{"data": "nombrerol"},
			{"data": "descripcion"},
			{"data": "status"},
			{"data": "options"}
		],
		"responsieve": "true",
		"bDestroy": true,
		"iDisplayLength": 10,
		"order": [[0, "desc"]]
	});

	//NUEVO ROL
	window.onload = function(){
	let formRol = document.querySelector('#formRol');
		if (formRol) {
			
			formRol.onsubmit = function(e){
				e.preventDefault();

				let strNombre = document.querySelector('#txtNombre').value,
					strDescripcion = document.querySelector('#txtDescripcion').value,
					intStatus = document.querySelector('#listStatus').value;
				if (strNombre == '' || strDescripcion == '' || intStatus == '') {
					swal("Atención", "Todos los campos son obligatorios", "error");
					return false;
				}
				let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				let ajaxUrl = base_url+'/Roles/setRol';
				let formData = new FormData(formRol);
				request.open("POST", ajaxUrl, true);
				request.send(formData);
				request.onreadystatechange = function(){
					if (request.readyState == 4 && request.status == 200) {
						
						let objData = JSON.parse(request.responseText);
						if (objData.status) {
							$('#modalFormRol').modal("hide");
							formRol.reset();
							swal("Roles de usuario", objData.msg, "success");
							tableRoles.api().ajax.reload(function(){
								// fntEditRol();
								// fntDelRol();
								// fntPermisos();
								// console.log(tableRoles);
							});
						}else{
							swal("Error", objData.msg, "error");
						}
					}
				}

			}
		}

	}
});

// Carga la tabla en la vista de roles
$('#tableRoles').DataTable();
// Muestra el modal para agregar un nuevo rol en la vista roles
function openModal() {

	document.querySelector('#idRol').value = "";
	document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
	document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
	document.querySelector('#btnText').innerHTML = "Guardar";
	document.querySelector('#titleModal').innerHTML = "Nuevo Rol";
	document.querySelector('#formRol').reset();

	$('#modalFormRol').modal('show');
}

window.addEventListener("load", function() {
    setTimeout(() => { 
        fntEditRol();
    }, 500);
 }, false);

// window.addEventListener('load', function(){
// 	fntEditRol();
// });

// Abre el modal al clickear en los botones editar roles
function fntEditRol(){
	let btnEditRol = document.querySelectorAll(".btnEditRol");
	btnEditRol.forEach(function(btnEditRol){
		btnEditRol.addEventListener('click', function(){

			document.querySelector('#titleModal').innerHTML = "Actualizar Rol";
			document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
			document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
			document.querySelector('#btnText').innerHTML = "Actualizar";

			let idrol = this.getAttribute("rl");
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			let ajaxUrl = base_url+'/Roles/getRol/'+idrol;
			request.open("GET", ajaxUrl, true);
			request.send();

			request.onreadystatechange = function(){
				if (request.readyState == 4 && request.status == 200) {

					let objData = JSON.parse(request.responseText);
					let optionSelect;

					if (objData.status)
					{
						document.querySelector('#idRol').value = objData.data.idrol;
						document.querySelector('#txtNombre').value = objData.data.nombrerol;
						document.querySelector('#txtDescripcion').value = objData.data.descripcion;

						if (objData.data.status == 1)
						{
							optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
						}else{
							optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
						}

						let htmlSelect = `${optionSelect}
										  <option value="1">Activo</option>
										  <option value="2">Inativo</option>
										`;
						document.querySelector('#listStatus').innerHTML = htmlSelect;
						$('#modalFormRol').modal('show');
					}else{
						swal("Error", objData.msg, "error");
					}
				}
			}

		});
	});

}
