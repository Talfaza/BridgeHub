package database

import (
	"log"
	"os"
	"github.com/Talfaza/bridgehub/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
var DB *gorm.DB
func Connect()  {
  err:=godotenv.Load()

  if err != nil {
    log.Fatal("Error Cannot Import .env File")
  }
  
  dns:= os.Getenv("DNS")
  database,err:=gorm.Open(mysql.Open(dns), &gorm.Config{}) 

  if err != nil {
    
    panic("Error Could not connect to the database")

  }else{
    log.Println("Connected Successfully !")
  }
  DB=database
  database.AutoMigrate(
    &models.User{},
    )
}
