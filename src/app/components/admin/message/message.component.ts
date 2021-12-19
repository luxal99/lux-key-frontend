import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../../service/message.service";
import { Message } from "src/app/models/Message";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.sass"],
})
export class MessageComponent implements OnInit {

  listOfMessage: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.messageService.getAll().subscribe((resp) => {
      this.listOfMessage = resp;
    });
  }
}
