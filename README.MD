# Events

---

一个简单的Pub/Sub，提供事件的添加、触发、移除。

---

## 使用说明

使用 `Event` 有两种方式，一种是直接实例化：

```
    var obj = new Event();
    obj.on('hello', function() {
        console.log("hello "+ arguments);
    });

    obj.trigger('hello',1,2,3);//hello [1,2,3]
});
```

另一种是将 `Events` 混入（mix-in）到其他类中：

```
    function A() {
    }

    A.prototype.hello = function() {
        this.trigger('wow');
    };

    Event.mixTo(A);

    var a = new A();
    a.on('wow', function() {
        console.log("hello")
    });

    A.hello();//hello

```

## API


### on `object.on(type, listener)`

给对象添加事件回调函数。

### off `object.off(type, listener)`

从对象上移除事件回调函数。两个参数是可选的：当没有参数的时候移除所有回调函数，当type的时候移除该type所有回调函数，存在type和listener时，移除特定回调函数。

### trigger `object.trigger(type, [*args])`

触发一个或多个事件（用空格分隔）。`*args` 参数会依次传给回调函数。

### mixTo `Events.mixTo(target)`

将 `Event` 的原型方法混入到指定对象或函数原型中。

