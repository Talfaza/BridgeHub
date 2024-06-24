package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

const SecretKey = "supermegasecretkey"

func GenerateJWT(issuer string) (string, error) {
	claim := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    issuer,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // Expires after 24h
	})

	return claim.SignedString([]byte(SecretKey))
}

func ClaimParsing(cookie string) (string, error) {
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil || !token.Valid {
		return "", err
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if !ok {
		return "", err 
	}

	return claims.Issuer, nil
}
