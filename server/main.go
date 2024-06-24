package main

import (
	"log"
	"os"

	"github.com/Talfaza/bridgehub/database"
	"github.com/Talfaza/bridgehub/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	database.Connect()

	// Get port from environment variable
	port := os.Getenv("PORT")

	// Create Fiber app
	app := fiber.New()

	// Setup routes
	routes.RouteSetup(app)

	// Start server
	err = app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
