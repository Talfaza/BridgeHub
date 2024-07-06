package models

type Server struct {
  Id           uint   `json:"id"`
  Name         string `json:"name"`
  Hostname     string `json:"hostname"`
  IpAdresse    string `json:"ipadresse"`
  Password     string `json:"password"`
  UserId       uint   `json:"userid"`
  User         User   `json:"user";grom:"foreignKey:UserId"`
}


