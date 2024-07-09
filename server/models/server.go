package models

type Server struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Hostname  string `json:"hostname"`
	IPAddress string `json:"ipaddress"`
	Password  string `json:"password"`
	UserID    uint   `json:"userid"`
}
