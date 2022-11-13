import logger from "@/pages/api/auth/logger";

describe('logger', () => {
  it('logs info messages', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    logger.info('foo', 'bar');
    expect(consoleSpy).toHaveBeenCalledWith('[NEXTAUTH INFO] ', 'foo', 'bar');
  });

  it('logs warning messages', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    logger.warn!('DEBUG_ENABLED');
    expect(consoleSpy).toHaveBeenCalledWith('[NEXTAUTH WARNING] ', 'DEBUG_ENABLED');
  });

  it('logs error messages', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    logger.error!('ERROR_CODE_123', new Error('Test error'));
    expect(consoleSpy).toHaveBeenCalledWith('[NEXTAUTH ERROR] ', new Error('Test error'), 'ERROR_CODE_123');
  });

  it('logs debug messages', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    logger.debug!('DEBUG_CODE_123', 'Metadata');
    expect(consoleSpy).toHaveBeenCalledWith('[NEXTAUTH DEBUG] ', 'Metadata', 'DEBUG_CODE_123');
  });
});