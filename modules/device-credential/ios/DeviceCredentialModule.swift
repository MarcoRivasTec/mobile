import ExpoModulesCore
import LocalAuthentication
import Security

public class DeviceCredentialModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TecmaDeviceCredential")

    AsyncFunction("isAvailableAsync") {
      LAContext().canEvaluatePolicy(.deviceOwnerAuthentication, error: nil)
    }

    AsyncFunction("authenticateAsync") { (reason: String, promise: Promise) in
      guard let accessControl = SecAccessControlCreateWithFlags(
        nil,
        kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly,
        .devicePasscode,
        nil
      ) else {
        promise.resolve("unavailable")
        return
      }

      let context = LAContext()
      context.evaluateAccessControl(
        accessControl,
        operation: .useItem,
        localizedReason: reason
      ) { success, error in
        defer { context.invalidate() }
        if success {
          promise.resolve("success")
          return
        }

        switch (error as? LAError)?.code {
        case .userCancel, .systemCancel, .appCancel:
          promise.resolve("cancelled")
        case .passcodeNotSet:
          promise.resolve("unavailable")
        default:
          promise.resolve("failed")
        }
      }
    }
  }
}
