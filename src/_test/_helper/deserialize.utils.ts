import { Deserializer } from 'jsonapi-serializer';

/**
 * Deserialize a JsonApi Serialized body response.
 * @param {unknown} body a serialized body of a request response.
 * @returns {Promise<void>}
 */
export async function deserializeBody(body: unknown): Promise<unknown> {
  return new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(body);
}
