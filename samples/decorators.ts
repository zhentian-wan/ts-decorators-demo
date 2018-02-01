enum LoggingLevel {
    INFO,
    WARNING,
    DEBUG,
    TRACE
}
const loggingLevel = LoggingLevel.DEBUG;

function LogMethod(level: LoggingLevel):Function {
    return (target: any, propertyKey: string,
            descriptor: PropertyDescriptor) => {

        const originalFunction:Function = descriptor.value;

        descriptor.value = function(...args:any[]) {
            if (level <= loggingLevel) {
                console.log(">> " + propertyKey + " " +  JSON.stringify(args));
            }

            originalFunction.apply(this,args);
        };


    }

}

class Database {
    name = 'ABC';

    @LogMethod(LoggingLevel.DEBUG)
    saveData(data: any) {
        console.log(`save user ${data.name} to the database ${this.name}`);
    }
}

const db = new Database();
db.saveData({name: 'zhentian'});