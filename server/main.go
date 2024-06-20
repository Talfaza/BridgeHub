package main

import (
  "github.com/Talfaza/bridgehub/database"
  "github.com/joho/godotenv"
  "log"
  "os"
  "github.com/gofiber/fiber/v2"

)


func main()  {
  database.Connect()
  err:=godotenv.Load()

  if err != nil {
    log.Fatal("Error Cannot Import .env File")
  }
  port:=os.Getenv("PORT")
  app:=fiber.New()

  app.Listen(":"+port)
  
}
