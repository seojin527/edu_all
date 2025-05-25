package com.jobscatch.careernavi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAiService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public String askChatGpt(String userMessage) {
        RestTemplate restTemplate = new RestTemplate();

        System.out.println("🚀 GPT 호출 시작됨");

        // 1. 요청 본문 구성
        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo"); // ✅ 실제 존재하는 모델 사용!
        body.put("messages", Collections.singletonList(
                Map.of("role", "user", "content", userMessage)
        ));

        // 2. 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            // ✅ 호출 전 로그
            System.out.println("🚀 GPT 요청 시작");
            System.out.println("🔐 API 키: " + openAiApiKey);

            // 3. GPT POST 요청
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    OPENAI_API_URL,
                    entity,
                    Map.class
            );

            // ✅ 응답 확인 로그
            System.out.println("🌐 GPT 응답 상태: " + response.getStatusCode());
            System.out.println("🌐 GPT 응답 바디: " + response.getBody());

            // 4. 응답 파싱
            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null) {
                    var choices = (List<Map<String, Object>>) responseBody.get("choices");
                    if (choices != null && !choices.isEmpty()) {
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        return (String) message.get("content");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("❌ GPT 호출 중 예외 발생!");
            System.out.println("❌ API 키 확인: " + openAiApiKey);
            e.printStackTrace();
        }

        return "죄송합니다. 답변을 가져올 수 없습니다.";
    }
}
