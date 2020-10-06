<?php 

	class RolesModel extends Mysql{
		public $intIdrol;
		public $strRol;
		public $strDescripcion;
		public $intStatus;

		public function __construct()
		{
			// echo 'Mensaje desde el modelo Home';
			parent::__construct();
			
		}

		public function selectRoles()
		{
			// Extrae todos los Roles
			$sql = "SELECT * FROM rol WHERE status != 0";
			$resquest = $this->selectAll($sql);
			return $resquest;
		}
		// Buscar rol
		public function selectRol(int $idrol)
		{
			$this->intIdrol = $idrol;
			$sql = "SELECT * FROM rol WHERE idrol = $this->intIdrol";
			$resquest = $this->select($sql);
			return $resquest;
		}
		// Guardar roles en BS
		public function insertRol(string $rol, string $descripcion, int $status)
		{
			$return = "";
			$this->strRol          = $rol;
			$this->strDescripcion = $descripcion;
			$this->intStatus      = $status;

			$sql = "SELECT * FROM rol WHERE nombrerol = '{$this->strRol}' ";
			$resquest = $this->selectAll($sql);

			if (empty($resquest))
			{
				$query_insert = "INSERT INTO rol(nombrerol, descripcion, status) VALUES(?,?,?)";
				$arrData = array($this->strRol, $this->strDescripcion, $this->intStatus);
				$resquest_insert = $this->insert($query_insert, $arrData);
				$return = $resquest_insert;				
			}else {
				$return = "exit";
			}

			return $return;
		}

		
	}

 ?>