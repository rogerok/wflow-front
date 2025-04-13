import { ReportCreateRequestType } from '../../api/reports/models/reports';
import { ReportCreateService } from './reportCreateService';

const reportData: ReportCreateRequestType = {
  bookId: '3d8858c8-81b3-464c-aee1-ac31af3ed405',
  goalId: '3d8858c8-81b3-464c-aee1-ac31af3ed405',
  wordsAmount: 0,
};

const callMock = vi.fn().mockResolvedValue({ id: '123' });

vi.mock('../../stores/request/RequestStore', () => {
  return {
    RequestStore: vi.fn().mockImplementation(() => ({
      call: callMock,
    })),
  };
});

describe('ReportCreateService tests', () => {
  let service: ReportCreateService;
  beforeEach(() => {
    vi.clearAllMocks();
    service = new ReportCreateService(reportData);
  });

  it('should submit form', async () => {
    service.form.fields.wordsAmount.setValue(100);

    await service.submit();

    expect(callMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledWith(
      {
        ...reportData,
        wordsAmount: 100,
      },
      service.abortController,
    );
    expect.any(AbortController);
  });

  it('creates abortController on submit', async () => {
    expect(service.abortController).toBeNull();

    await service.submit();

    expect(service.abortController).not.toBeNull();
  });

  it('calls abort on abortRequest', () => {
    const abort = vi.fn();
    service.abortController = { abort } as unknown as AbortController;

    service.abortRequest();

    expect(abort).toHaveBeenCalled();
    expect(service.abortController).toBeNull();
  });

  it('does not call on validation failure', async () => {
    service.form.fields.bookId.setValue('invalid id');

    await service.submit();

    expect(callMock).not.toHaveBeenCalled();
  });
});
