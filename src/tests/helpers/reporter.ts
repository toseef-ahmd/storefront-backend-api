import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from "jasmine-spec-reporter"

import SuitInfo = jasmine.SuiteInfo

class CustomProcessor extends DisplayProcessor {
  public DisplayJasmineStarted(info: SuitInfo, status: string): string {
    return `${status}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
)
