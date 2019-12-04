package com.idonate.backend.resources;

import com.idonate.backend.domains.Greeting;
import com.idonate.backend.domains.Message;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

/**
 * MessageResource
 */
@Controller
public class MessageResource {

    @MessageMapping("hello")
    @SendTo("topic/greetings")
    public Greeting greeting(Message m) throws Exception{
        Thread.sleep(1000);
        return new Greeting("Hello, "+ HtmlUtils.htmlEscape(m.getMessage()));
    }
}