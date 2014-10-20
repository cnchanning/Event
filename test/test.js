var expect = require("expect.js");
var Event = require("../Event.js");
describe("pagination", function() {

    it("初始化",function(){
        var event = new Event();
        expect(event).to.be.a(Event);
    });
    it("不用new初始化",function(){
        var event = Event();
        expect(event).to.be.a(Event);
    });
    it("绑定/触发",function(){
        var event = new Event();
        var counter=0;
        event.on("event",function(){counter++});
        expect(counter).to.be(0);
        event.trigger("event");
        expect(counter).to.be(1);
        event.trigger("event");
        expect(counter).to.be(2);

    });
    it("绑定一次然后移除绑定",function(){
        var event = new Event();
        var counter=0;
        event.on("event",function(){counter++});
        expect(counter).to.be(0);
        event.trigger("event");
        expect(counter).to.be(1);
        event.off("event");
        event.trigger("event");
        expect(counter).to.be(1);
    });
    it("绑定相同事件多次按顺序触发",function(){
        var event = new Event();
        var counter=[];
        event.on("event",function(){counter.push(1)});
        event.on("event",function(){counter.push(2)});
        event.on("event",function(){counter.push(3)});
        event.trigger("event");
        expect(counter).to.eql([1,2,3]);
    });

    it("绑定相同事件多次,移除一个handle",function(){
        var event = new Event();
        var counter=[];
        var handle1=function(){
            counter.push(1)
        };
        var handle2=function(){
            counter.push(2)
        };
        var handle3=function(){
            counter.push(3)
        };
        event.on("event",handle1);
        event.on("event",handle2);
        event.on("event",handle3);
        event.trigger("event");
        expect(counter).to.eql([1,2,3]);
        counter=[];
        event.off("event",handle2);
        event.trigger("event");
        expect(counter).to.eql([1,3]);
    });

    it("绑定多次然后移除绑定",function(){
        var event = new Event();
        var counter=0;
        event.on("event",function(){counter++});
        event.on("event",function(){counter++});
        expect(counter).to.be(0);
        event.trigger("event");
        expect(counter).to.be(2);
        event.off("event");
        event.trigger("event");
        expect(counter).to.be(2);
    });
    it("绑定多个事件然后移除单个事件",function(){
        var event = new Event();
        var counter=0;
        event.on("event1",function(){counter++;});
        event.on("event2",function(){counter++;counter++;});
        expect(counter).to.be(0);
        event.trigger("event1");
        expect(counter).to.be(1);
        event.trigger("event2");
        expect(counter).to.be(3);
        event.off("event1");
        event.trigger("event1");
        expect(counter).to.be(3);
        event.trigger("event2");
        expect(counter).to.be(5);
    });

    it("绑定多个事件然后全部移除",function(){
        var event = new Event();
        var counter=0;
        event.on("event1",function(){counter++;});
        event.on("event2",function(){counter++;counter++;});
        expect(counter).to.be(0);
        event.trigger("event1");
        expect(counter).to.be(1);
        event.trigger("event2");
        expect(counter).to.be(3);
        event.off();
        event.trigger("event1");
        expect(counter).to.be(3);
        event.trigger("event2");
        expect(counter).to.be(3);
    });

    it("单次绑定",function(){
        var event = new Event();
        var counter=0;
        event.once("event",function(){counter++;});
        expect(counter).to.be(0);
        event.trigger("event");
        expect(counter).to.be(1);
        event.trigger("event1");
        expect(counter).to.be(1);

    });
});