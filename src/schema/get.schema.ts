import S from 'fluent-json-schema'

export const createGetSchema = {
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
}