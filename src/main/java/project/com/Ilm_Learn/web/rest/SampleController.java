package project.com.Ilm_Learn.web.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "Sample Controller", description = "Sample API operations")
public class SampleController {

    @GetMapping("/hello")
    @ApiOperation("Returns a sample greeting")
    public String hello() {
        System.out.println("hello");

        return "Hello, Swagger!";
    }
}
