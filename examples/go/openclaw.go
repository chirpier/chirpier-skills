package main

import (
	"context"

	"github.com/chirpier/chirpier-go"
)

func main() {
	client, _ := chirpier.NewClient(chirpier.Options{Key: "chp_your_api_key"})
	defer client.Close(context.Background())

	_ = client.Log(context.Background(), chirpier.Log{
		Agent: "openclaw.main",
		Event: "tokens.used",
		Value: 1530,
	})

	_ = client.Flush(context.Background())
}
