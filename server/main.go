package main

import (
	"log"
	"os"

	"github.com/Talfaza/bridgehub/database"
	"github.com/Talfaza/bridgehub/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Connect()

	port := os.Getenv("PORT")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Content-Type, Authorization",
		AllowCredentials: true,
	}))

	routes.RouteSetup(app)

	err = app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
