package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.domain.ChatMessage;
import com.jobscatch.careernavi.repository.ChatMessageRepository;
import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final OpenAiService openAiService;

    @PostMapping("/send")
    public List<ChatMessage> sendMessage(@RequestBody ChatMessage userMessage) {

        // ✅ 디버깅: 사용자 메시지 확인
        System.out.println("🟢 사용자 메시지 도착");
        System.out.println("🟢 role: " + userMessage.getRole());
        System.out.println("🟢 message: " + userMessage.getMessage());

        userMessage.setCreatedAt(getNowTime());
        chatMessageRepository.save(userMessage);

        // ✅ 디버깅: GPT 호출 직전
        System.out.println("💬 GPT 호출 시작");

        String aiReply = openAiService.askChatGpt(userMessage.getMessage());

        // ✅ 디버깅: GPT 응답 확인
        System.out.println("💬 GPT 응답 도착: " + aiReply);

        ChatMessage aiMessage = new ChatMessage();
        aiMessage.setRole("ai");
        aiMessage.setMessage(aiReply);
        aiMessage.setCreatedAt(getNowTime());
        chatMessageRepository.save(aiMessage);

        return chatMessageRepository.findAll();
    }

    @GetMapping("/messages")
    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAll();
    }

    private String getNowTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
