const fn = require('./src/apply/repos/apply');

test('readApplyLog 테스트1', async() => {
    const data = await fn.readApplyLog(4, 1);
    expect(data).toStrictEqual({
        id: 1,
        user_id: 1,
        opening_id: 4,
    })
});