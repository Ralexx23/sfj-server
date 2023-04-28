interface parseZ_err {
    code: string,
    err: {
        expected: string,
        received: string,
        line: number,
    };
    where: string;
    isReq: boolean;
}

const zodeer = (errs: any): parseZ_err[] => {
    const result: parseZ_err[] = [];
    errs.issues.map((err: any) => {
        result.push({
            code: err.code,
            err: {
                expected: err.expected,
                received: err.received,
                line: err.line,
            },
            where: err.path.join('.'),
            isReq: err.message.includes('required'),
        });
    });
    return result;
};

export default zodeer;