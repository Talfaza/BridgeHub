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
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	database.Connect()

	// Get port from environment variable
	port := os.Getenv("PORT")

	app := fiber.New()
  app.Use(cors.New(cors.Config{
          AllowOrigins: "http://localhost:5173", 
          AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
          AllowHeaders: "Content-Type, Authorization",
          AllowCredentials: true, // Enable CORS credentials (cookies)
      }))
	// Setup routes
	routes.RouteSetup(app)

	// Start server
	err = app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
