package controller

import (
	"bytes"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/ssh"
)

type SSHRequest struct {
	IP       string `json:"ip"`
	Username string `json:"username"`
	Password string `json:"password"`
	Command  string `json:"command"`
}

func ExecuteCommand(c *fiber.Ctx) error {
	var req SSHRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	config := &ssh.ClientConfig{
		User: req.Username,
		Auth: []ssh.AuthMethod{
			ssh.Password(req.Password),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	conn, err := ssh.Dial("tcp", req.IP+":22", config)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to dial SSH",
			"error":   err.Error(),
		})
	}
	defer conn.Close()

	session, err := conn.NewSession()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create SSH session",
			"error":   err.Error(),
		})
	}
	defer session.Close()

	var outputBuffer bytes.Buffer
	session.Stdout = &outputBuffer
	session.Stderr = &outputBuffer

	if err := session.Run(req.Command); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to run command",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"output": outputBuffer.String(),
	})
}
