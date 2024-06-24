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

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dns := os.Getenv("DNS")

	database, err := gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	log.Println("Connected to database")

	DB = database

	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Error migrating database: %v", err)
	}
}
