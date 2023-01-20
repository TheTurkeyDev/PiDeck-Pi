package main

type BasePacket struct {
	Action string `json:"action"`
}

type ButtonUpdatePacket struct {
	BasePacket
	Data TriggerButton `json:"data"`
}
